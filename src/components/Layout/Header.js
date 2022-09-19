import React from 'react';
import mealImage from "../../assets/meals.jpg"
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = props => {
    return <React.Fragment>
                <header className={classes.header}>
                    <h1>ReactMeals</h1>
                    <HeaderCartButton/>
                </header>
                <div className={classes['main-image']}>
                    <img src={mealImage} alt='the deicious food'/>
                </div>
            