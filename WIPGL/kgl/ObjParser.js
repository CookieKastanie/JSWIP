class ObjParser{
  static getVertsAndFaces(str){
    let liste = str.split("\n");

    let verts = new Array();
    let norms = new Array();
    let facesIndex = new Array();
    let faces = new Array();

    for(let e of liste){
    	let elem = e.split(" ");
    	if (elem[0] == "v") {
        verts.push({
          x: parseFloat(elem[1]),
          y: parseFloat(elem[2]),
          z: parseFloat(elem[3])
        });
    	} else if(elem[0] == "f"){
        let p1 = elem[1].split("/");
        let p2 = elem[2].split("/");
        let p3 = elem[3].split("/");

    		facesIndex.push(parseInt(p1[0]) - 1);
    		facesIndex.push(parseInt(p2[0]) - 1);
    		facesIndex.push(parseInt(p3[0]) - 1);

        faces.push({
          p1: parseInt(p1[0]) - 1,
          p2: parseInt(p2[0]) - 1,
          p3: parseInt(p3[0]) - 1,

          n1: parseInt(p1[2]) - 1,
          n2: parseInt(p2[2]) - 1,
          n3: parseInt(p3[2]) - 1
        });

    	} else if(elem[0] == "vn"){
        norms.push({
          x: parseFloat(elem[1]),
          y: parseFloat(elem[2]),
          z: parseFloat(elem[3])
        });
      }
    }



    let vertsFinal = new Array();

    for (let f of faces) {
      vertsFinal[f.p1*6] = verts[f.p1].x
      vertsFinal[f.p1*6+1] = verts[f.p1].y
      vertsFinal[f.p1*6+2] = verts[f.p1].z

      vertsFinal[f.p2*6] = verts[f.p2].x
      vertsFinal[f.p2*6+1] = verts[f.p2].y
      vertsFinal[f.p2*6+2] = verts[f.p2].z

      vertsFinal[f.p3*6] = verts[f.p3].x
      vertsFinal[f.p3*6+1] = verts[f.p3].y
      vertsFinal[f.p3*6+2] = verts[f.p3].z



      vertsFinal[f.p1*6+3] = norms[f.n1].x
      vertsFinal[f.p1*6+4] = norms[f.n1].y
      vertsFinal[f.p1*6+5] = norms[f.n1].z

      vertsFinal[f.p2*6+3] = norms[f.n2].x
      vertsFinal[f.p2*6+4] = norms[f.n2].y
      vertsFinal[f.p2*6+5] = norms[f.n2].z

      vertsFinal[f.p3*6+3] = norms[f.n3].x
      vertsFinal[f.p3*6+4] = norms[f.n3].y
      vertsFinal[f.p3*6+5] = norms[f.n3].z
    }

    return {
      vertices: vertsFinal,
      faces: facesIndex
    }
  }
}
