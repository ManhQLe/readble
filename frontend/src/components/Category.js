import React, { Component } from 'react'
import Paper from 'material-ui/Paper';


function Category(props){
    const {category} = props;
    return <h1 style={{display:"inline-block"}}>{category.name}</h1>    
}

export default Category;