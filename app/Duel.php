<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Duel extends Model
{
    protected $table = 'duels';

    public function users(){
        return $this->hasMany(User::class);
    }
}
