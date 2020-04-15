<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\User;
use App\Card;
use App\Helpers\JwtAuth;

class UserController extends Controller
{
    public function register(Request $request){
        //Recoger variables post
        $json = $request->input('json', null);
        $params = json_decode($json);

        $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $username = (!is_null($json) && isset($params->username)) ? $params->username : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;

        if(!is_null($email) && !is_null($username) && !is_null($password)){
            //Se crea el usuario

            $user = new User();

            $user->email = $email;
            $user->username = $username;
            $pass_cifrada = hash('sha256', $password);
            $user->password = $pass_cifrada;

            //Comprobar si existe el usuario
            $isset_user = User::where('email', '=', $email)->first();

            if(!$isset_user){
                //Crear el usuario
                $user->save();

                $cards = Card::find([1,2]);
                $user->cards()->attach($cards);

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Usuario registrado correctamente'
                );

            } else{
                //Ya existe

                $data = array(
                    'status' => 'error',
                    'code' => 400,
                    'message' => 'El usuario ya existe'
                );
            }

        }
        else{
            //No se crea el usuario

            $data = array(
                'status' => 'error',
                'code' => 400,
                'message' => 'Usuario no creado'
            );
        }

        return response()->json($data, 200);
    }

    public function login(Request $request){
        $jwtAuth = new JwtAuth();

        //Recibir datos
        $json = $request->input('json', null);
        $params = json_decode($json);

        $email = (!is_null($json) && isset($params->email)) ? $params->email : null;
        $password = (!is_null($json) && isset($params->password)) ? $params->password : null;
        $getToken = (!is_null($json) && isset($params->getToken)) ? $params->getToken : null;

        //Cifrar password
        $pwd = hash('sha256', $password);

        if (!is_null($email) && !is_null($password) && ($getToken == null || $getToken == 'false')) {
            //Login
            $signup = $jwtAuth->signup($email, $pwd);

        }elseif ($getToken != null) {
            $signup = $jwtAuth->signup($email, $pwd, $getToken);

        }else {
            $signup = array(
                'status' => 'error',
                'message' => 'Error al enviar los datos'
            );
        }

        return response()->json($signup, 200);
    }
}
