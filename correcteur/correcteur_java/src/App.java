import java.util.ArrayList;

public class App {
  public static void main(String[] args) {
    double tempGenerationDico = System.nanoTime();
    Dictionnaire dico = new Dictionnaire(Utils.loadFile("D:/GitHub/JSWIP/correcteur/correcteur_java/dico.txt"), 5);
    double deltaGenerationDico = (System.nanoTime() - tempGenerationDico) / 1_000_000_000;
    System.out.println("Creation dico "+ deltaGenerationDico +" secondes");

    ArrayList<String> fautes = Utils.loadFile("D:/GitHub/JSWIP/correcteur/correcteur_java/fautes.txt");

    double tt = System.nanoTime();

    for(String mot : fautes) {
      double t = System.nanoTime();
      ArrayList<String> res = dico.verify(mot);
      double delta = (System.nanoTime() - t) / 1_000_000_000;
      System.out.println("Resultats pour "+ mot +" en "+ delta +" secondes => "+ res);
    }

    System.out.println("Temp total: "+ ((System.nanoTime() - tt) / 1_000_000_000));
  }
}
