import classes from './AvailableMeals.module.css'
import React , {useState, useEffect} from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];

const AvailableMeals = props => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] =  useState(true)
  const [httpError, setHttpError] = useState(null)
  useEffect(()=> {
    const fetchMeals = async() => {
    const response = await fetch('https://react-test-aefc2-default-rtdb.firebaseio.com/meals.json')

    if(!response.ok){
      throw new Error('something went wrong')
    }
    const data = await response.json()  

    const loadedMeals= [];
    for(const key in data){
      loadedMeals.push({
        id:key,
        name:data[key].name,
        description:data[key].description,
        price:data[key].price
      })
    }
    setMeals(loadedMeals)
    setIsLoading(false)
  }


      fetchMeals().catch((err) => {
        setIsLoading(false)
        setHttpError(err.message)
      })
  
 
  },[])
  if (isLoading){
    return (
      <section className={classes.mealsLoading}>
        <p>is loading .....</p>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }
    console.log('test')
    const mealList = meals.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price ={meal.price}/>);
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;