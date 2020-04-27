<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pack extends Model
{
    protected $table = 'packs';

    public function cards(){
        return $this->hasMany(Card::class);
    }
}