<?php
/**
 * File Permission.php
 *
 * @author Tuan Duong <bacduong@gmail.com>
 * @package Laravue
 * @version 1.0
 */

namespace App\Laravue\Models;
use App\Laravue\Acl;
use Illuminate\Database\Query\Builder;

/**
 * Class Permission
 *
 * @package App\Laravue\Models
 */
class Permission extends \Spatie\Permission\Models\Permission
{
    public $guard_name = 'api';

    /**
     * To exclude permission management from the list
     *
     * @param $query
     * @return Builder
     */
    public function scopeAllowed($query)
    {
        return $query->where('name', '!=', Acl::PERMISSION_PERMISSION_MANAGE);
    }

    // public function children()
    // {
    //     return $this->hasMany(self::class, 'padre_id');    
    // }

    public function childs() {
        return $this->hasMany('App\Laravue\Models\Permission','padre_id','id') ;
    }
    // public function parent()
    // {
    //     return $this->belongsTo('App\Laravue\Models\Permission','parent_id')->where('parent_id',0)->with('parent');
    // }

    // public function children()
    // {
    //     return $this->hasMany('App\Laravue\Models\Permission','parent_id')->with('children');
    // }
}
