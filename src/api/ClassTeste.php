<?php
// include("ClassConexao.php");

// class ClassTeste extends ClassConexao{
//     public function exibeTeste(){
//         $BFetch = $this->conectaDB()->prepare("select * from diasemana");
//         $BFetch->execute();

//         $J=[];
//         $I=0;
//         while ($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
//             $J[$I]=[
//                 "id"=>$Fetch['id'],
//                 "dia"=>$Fetch['dia']
//             ];
//             $I++;
//         }

//         header("Access-Control-Allow-Origin:*");
//         header("Content-type: application/json");
//         echo json_encode($J);
//     }
// }

include("ClassConexao.php");

class ClassTeste extends ClassConexao{
    public function exibeTeste(){
        $dia = $_POST['nome'];

        $BFetch = $this->conectaDB()->prepare("insert into diasemana VALUES (null,?)");
        $BFetch->execute(array($dia));
    }
}

?>