import java.util.*;

public class Dictionnaire {

  private class MatriceDistance {
    private int largeur, hauteur;
    private int[][] matrice;

    private void init(int max) {
      this.matrice = new int[max][max];
    }

    public void setSize(int largeur, int hauteur) {
      this.largeur = largeur;
      this.hauteur = hauteur;
    }

    public void set(int x, int y, int value) {
      this.matrice[y][x] = value;
    }

    public int get(int x, int y) {
      return this.matrice[y][x];
    }

    public int largeur() {
      return this.largeur;
    }

    public int hauteur() {
      return this.hauteur;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private class DistanceContainer implements Comparable<DistanceContainer> {
    public String mot;
    public double distance;

    DistanceContainer(String mot, double distance) {
      this.mot = mot;
      this.distance = distance;
    }

    @Override
    public int compareTo(DistanceContainer o) {
      return (o.distance - this.distance) < 0 ? 1 : -1;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private static final double distanceJaccardMin = 0.2;

  private HashMap<String, ArrayList<String>> trigrammeDico;
  private MatriceDistance matrice;
  private int nbResultat;

  public Dictionnaire(ArrayList<String> mots, int nbResultat) {
    this.nbResultat = nbResultat;
    this.matrice = new MatriceDistance();
    this.generateDico(mots);
  }

  private void generateDico(ArrayList<String> mots) {
    this.trigrammeDico = new HashMap();

    int maxLength = 0;

    for(String mot : mots) {
      String motChevrons = toAscii('<'+ mot +'>');
      for(int i = 0; i <= motChevrons.length() - 3; ++i) {
        String trigramme = motChevrons.substring(i, i + 3);

        if(this.trigrammeDico.get(trigramme) == null)
          this.trigrammeDico.put(trigramme, new ArrayList());
        this.trigrammeDico.get(trigramme).add(mot);

        maxLength = Math.max(maxLength, mot.length());
      }
    }

    this.matrice.init(maxLength + 1);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private static final String TAB_00C0 = "" +
          "AAAAAAACEEEEIIII" +
          "DNOOOOO×OUUUÜYTs" +
          "aaaaaaaceeeeiiii" +
          "dnooooo÷ouuuüyty" +
          "AaAaAaCcCcCcCcDd" +
          "DdEeEeEeEeEeGgGg" +
          "GgGgHhHhIiIiIiIi" +
          "IiJjJjKkkLlLlLlL" +
          "lLlNnNnNnnNnOoOo" +
          "OoOoRrRrRrSsSsSs" +
          "SsTtTtTtUuUuUuUu" +
          "UuUuWwYyYZzZzZzs";

  private String toAscii(String source) {
    StringBuilder sb = new StringBuilder(source.length());
    for (int i = 0; i < source.length(); i++) {
      char c = source.charAt(i);
      switch (c) {
        case 'Œ':
          sb.append("OE");
          break;
        case 'œ':
          sb.append("oe");
          break;
        default:
          if (c >= 0xc0 && c <= 0x17f) {
            c = TAB_00C0.charAt(c - 0xc0);
          }
          sb.append(c);
      }
    }
    return sb.toString();
  }

  private double distanceLevenshtein(String mot, String motAComp) {
    matrice.setSize(mot.length(), motAComp.length());

    for(int i = 0; i < matrice.largeur(); ++i)
      matrice.set(i,0, i);

    for(int i = 0; i < matrice.hauteur(); ++i)
      matrice.set(0, i, i);

    int coutSub;

    for(int y = 1; y <= matrice.hauteur(); ++y) {
      for(int x = 1; x <= matrice.largeur(); ++x) {

        if(mot.charAt(x - 1) == motAComp.charAt(y -1)) coutSub = 0;
        else coutSub = 1;

        if(x > 1 && y > 1 && mot.charAt(x - 1) == motAComp.charAt(y - 2) && mot.charAt(x - 2) == motAComp.charAt(y - 1)) {
          matrice.set(x, y, Math.min(matrice.get(x, y), matrice.get(x - 2,y - 2) + coutSub));
        } else {
          matrice.set(x, y, Math.min(matrice.get(x - 1, y) + 1, Math.min(matrice.get(x, y - 1) + 1, matrice.get(x - 1, y - 1) + coutSub)));
        }
      }
    }

    return matrice.get(matrice.largeur(), matrice.hauteur());
  }

  private double distanceJaccard(String m, String d, double nb) {
    return nb / (m.length() + d.length() - nb);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  private ArrayList<String> getTrigrammes(String mot) {
    ArrayList<String> trigrammes = new ArrayList();
    String motChevrons = '<'+ mot +'>';

    for(int i = 0; i <= motChevrons.length() - 3; ++i) {
      String trigramme = motChevrons.substring(i, i + 3);
      trigrammes.add(trigramme);
    }

    return trigrammes;
  }

  private HashSet<String> getWordList(String mot) {
    HashMap<String, Double> localDico = new HashMap();
    HashSet<String> result = new HashSet();

    ArrayList<String> trigrammes = this.getTrigrammes(mot);

    for(String trigramme : trigrammes) {
      ArrayList<String> list = this.trigrammeDico.get(trigramme);

      if(list == null) continue;

      for (String localMot : list) {
        if(localDico.get(localMot) == null) localDico.put(localMot, 0d);
        localDico.put(localMot, localDico.get(localMot) + 1);

        if(this.distanceJaccard(mot, localMot, localDico.get(localMot)) > distanceJaccardMin)
          result.add(localMot);
      }
    }

    return result;
  }

  public ArrayList<String> verify(String mot) {
    mot = toAscii(mot);

    TreeSet<DistanceContainer> result = new TreeSet();
    HashSet<String> mots = this.getWordList(mot);

    //System.out.println(mots);

    for(String localMot : mots) {
      result.add(new DistanceContainer(localMot, this.distanceLevenshtein(mot, toAscii(localMot))));
    }

    ArrayList<String> resFinal = new ArrayList();
    int max = Math.min(this.nbResultat, result.size());
    for(DistanceContainer dc : result) {
      resFinal.add(dc.mot);
      if(--max == 0) break;
    }

    return resFinal;
  }
}