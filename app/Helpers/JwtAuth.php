<?php
namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\User;

class JwtAuth {
    public $key;

    public function __construct(){
        $this->key = '1234abcd';
    }

    public function signup($email, $password, $getToken=null){

        $user = User::where(
            array(
                'email' => $email,
                'password' => $password
            ))->first();

        $signup = false;
        if(is_object($user)){
            $signup = true;
        }

        if ($signup) {
            // Generar token
            $token = array(
                'sub' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'puntos' => $user->puntos,
                'iat' => time(),
                'exp' => time() + (7 * 24 * 60 * 60)
            );

            $jwt = JWT::encode($token, $this->key, 'HS256');
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));

            if (is_null($getToken)) {
                return $jwt;
            }else{
                return $decoded;
            }

        } else{
            //Mostrar error
            return array('statis' => 'error', 'message' => 'Inicio de sesion fallido');
        }
    }

    public function checkToken($jwt, $getIdentity = false){
        $auth = false;

        try{
            $decoded = JWT::decode($jwt, $this->key, array('HS256'));

        } catch(\UnexpectedValueException $e){
            $auth = false;
        }catch(\DomainException $e){
            $auth = false;
        }

        if (isset($decoded) && is_object($decoded) && isset($decoded->sub)) {
            $auth = true;
        }else{
            $auth = false;
        }

        if ($getIdentity) {
            return $decoded;
        }
        
        return $auth;
    }
}