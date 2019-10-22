import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Utils {
  public static ArrayList<String> loadFile(String path) {
    File file = new File(path);
    ArrayList<String> buffer = new ArrayList();


    try {
      Scanner sc = new Scanner(file);
      while(sc.hasNext()) {
        buffer.add(sc.nextLine());
      }

    } catch (FileNotFoundException e) {
      e.printStackTrace();
    }


    return buffer;
  }
}
