<?php
abstract class ClassConexao{
    protected function conectaDB(){
    try {
        $Con = new PDO('mysql:host=localhost;dbname=banco_redes','root','root');
        return $Con;
    } catch (PDOException $Erro) {
        echo $Erro->getMessage();
    }
    }
}
?>