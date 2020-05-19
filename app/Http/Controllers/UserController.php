<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

use App\User;
use App\Card;
use App\Duel;
use App\Match;
use App\Helpers\JwtAuth;

class UserController extends Controller
{
    public function register(Request $request){

        header('Access-Control-Allow-Origin: *');

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
            $user->puntos = 100;

            //Comprobar si existe el usuario
            $isset_email = User::where('email', '=', $email)->first();
            $isset_username = User::where('username', '=', $username)->first();

            if(!$isset_email && !$isset_username){
                //Crear el usuario
                $user->save();

                //Asignamos las cartas iniciales para los usuarios recién creados
                //Necesitamos crear para ello unos números aleatorios para asignar 4 cartas de nivel 1 y una de nivel 2
                $arrayRandom = [rand(1,11), rand(1,11), rand(1,11), rand(1,11), rand(12,22)];

                $cards = Card::find($arrayRandom);
                /* $user->cards()->attach($cards); */
                $user->cards()->saveMany($cards);

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

        header('Access-Control-Allow-Origin: *');

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

    public function getAllUsers(){
        header('Access-Control-Allow-Origin: *');
        
        $users = User::all();
        
        return response()->json(array(
            'users' => $users,
            'status' => 'success'
        ), 200);
    }

    public function createDuel(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods');

        $inputJSON = file_get_contents('php://input');
        $params = json_decode( $inputJSON, false );
                
        $duel = new Duel();
        
        $duel->retador = $params->retador;
        $duel->retado = $params->retado;
        $duel->retadorName = $params->retadorName;
        $duel->retadoName = $params->retadoName;
        
        $duel->save();

        $data = array(
            'status' => 'success',
            'code' => 200,
            'message' => 'Duelo creado correctamente'
        );

        return response()->json($data, 200);
    }

    public function getDuels(){
        header('Access-Control-Allow-Origin: *');
        
        $duels = Duel::all();
        
        return response()->json(array(
            'duels' => $duels,
            'status' => 'success'
        ), 200);
    }

    public function deleteDuel(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods');

        $json = $request->input('json', null);
        $params = json_decode($json);

        //$inputJSON = file_get_contents('php://input');
        //$params = json_decode( $inputJSON, false );
        //$array = json_decode(json_encode($params), true);
        
        //$retadoName = $array['retadoName'];
        $retadoName = $params;
        
        /* $duel = new Duel();
        
        $duel->retador = $params->retador;
        $duel->retado = $params->retado;
        $duel->retadorName = $params->retadorName;
        $duel->retadoName = $params->retadoName; */
        
        $duel = Duel::where('retadoName', $retadoName);    
        $duel->delete();

        $data = array(
            'status' => 'success',
            'code' => 200,
            'message' => 'Duelo rechazado correctamente'
        );
        
        return response()->json($data, 200);
    }

    public function createGame(Request $request){
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods');

        $inputJSON = file_get_contents('php://input');
        $params = json_decode( $inputJSON, false );
                
        $match = new Match();
        
        $match->player1 = $params->player1;
        $match->player2 = $params->player2;
        $match->player1Name = $params->player1Name;
        $match->player2Name = $params->player2Name;
        $match->puntuacionPlayer1 = $params->puntuacionPlayer1;
        $match->puntuacionPlayer2 = $params->puntuacionPlayer2;
        $match->cartasPlayer1 = $params->cartasPlayer1;
        $match->cartasPlayer2 = $params->cartasPlayer2;
        
        $match->save();

        $data = array(
            'status' => 'success',
            'code' => 200,
            'message' => 'Duelo creado correctamente'
        );

        return response()->json($data, 200);
    }

}
