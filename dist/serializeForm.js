/*! jquery-serializeForm - Make an object out of form elements - v1.1.4 - 2013-08-12\n* https://github.com/danheberden/jquery-serializeForm
* Copyright (c) 2013 Dan Heberden; Licensed MIT */(function( $ ){
  $.fn.serializeForm = function() {

    // don't do anything if we didn't get any elements
    if ( this.length < 1) { 
      return false; 
    }

    var data = {};
    var lookup = data; //current reference of data
    var selector = ':input[type!="checkbox"][type!="radio"]:not(:disabled), input:checked:not(:disabled)';
    var parse = function() {

      // data[a][b] becomes [ data, a, b ]
      var named = this.name.replace(/\[([^\]]+)?\]/g, ',$1').split(',');
      var cap = named.length - 1;
      var $el = $( this );

      // Ensure that only elements with valid `name` properties will be serialized
      if ( named[ 0 ] ) {
        for ( var i = 0; i < cap; i++ ) {
          if( lookup[ named[i] ] ){
            lookup = lookup[ named[i] ];
          }
          else{
            // move down the tree - create objects or array if necessary
            var node =  ( named[ i + 1 ] === "" || !isNaN( named[ i + 1 ]) ) ? [] : {};
            // push or assign the new node
            if ( lookup.length !==  undefined ) {
              lookup.push( node );
              lookup = node;
            }else {
              lookup = lookup[ named[i] ] = node;
            }
          }
        }

        // at the end, push or assign the value
        if ( lookup.length !==  undefined ) {
          lookup.push( $el.val() );
        }else {
          lookup[ named[ cap ] ]  = $el.val();
        }

        // assign the reference back to root
        lookup = data;
      }
    };

    // first, check for elements passed into this function
    this.filter( selector ).each( parse );

    // then parse possible child elements
    this.find( selector ).each( parse );

    // return data
    return data;
  };
}( jQuery ));
