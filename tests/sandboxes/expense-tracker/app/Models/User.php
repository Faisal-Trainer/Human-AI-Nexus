<?php
namespace App;
use Illuminate\Database\Eloquent\Model as Eloquent; // Importing Model from Laravel Framework 
class User extends Eloquent {   // Defining the model name (User) in namespace 'App' of current file. This is a convention for naming models, you can use any valid PHP class names here!   
     public $timestamps = false;// Disable Laravel to automatically maintain created_at and updated_at fields  // If true then these columns will be filled with the timestamp when record inserted/updated.  
      protected $fillable=['username', 'email','password'];       // Define which attributes are mass assignable, ie can be set via "$user->fill($request->all())"  (Username and email cannot change after creation)   
     use \Illuminate\Database\Eloquent\SoftDeletes;   // Importing Soft Deletion trait for soft delete functionality. If you want to enable it, uncomment this line too!      protected $dates = ['deleted_at'];  // Enable Laravel's timestamps and deleted at fields on the User model
}   
?>     This is a simple Eloquent Model 'User'. It has mass assignable attributes (username , email, password). The use of SoftDeletes trait will enable soft delete functionality. If you want to disable it then uncomment this line too!  Please note that the above code should be placed in your User model file and not inside any other class or namespace as Laravel's autoloading mechanism might fail if there are no classes defined at bootstrapping stage of application start up due to which.