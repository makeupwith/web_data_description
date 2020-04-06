// # 折り畳み操作
function folding(){
  var obj = document.getElementsByClassName('folding');
  var icon = document.getElementsByClassName('inversion');
  for(var i=0;i<obj.length;i++){
      if(obj[i].style.display == "inline-block"){
          obj[i].style.display = "none";
      }
      else{
          obj[i].style.display = "inline-block";
      }
  }
  for(var i=0;i<icon.length;i++) {
    if(icon[i].style.transform == "scale(1, -1)") {
      icon[i].style.transform = "scale(1, 1)";
      console.log("yes");
    }
    else {
      icon[i].style.transform = "scale(1, -1)";
      console.log("no");
    }
  }
}