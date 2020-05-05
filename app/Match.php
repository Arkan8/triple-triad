<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Match extends Model
{
    protected $table = 'matches';

    public function users(){
        return $this->hasMany(User::class);
    }
}
