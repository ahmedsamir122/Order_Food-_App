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
  const [DUMMY_MEALS, setDUMMY_MEAlS]= useState([])
  const [isLoading, setIsLoading]= useState(true)
  const [error, setError]= useState(null)
  useEffect(()=> {
    async function fetchData() {
      try{
        const response = await fetch('https://react-test-aefc2-default-rtdb.firebaseio.com/meals.json');
        console.log(response.ok)
        const data = await response.json()
        if(!data) {
          throw new Error('Request failed')
        }
        console.log(data)
        const loadMeals = [];
    for (const key in data){
      loadMeals.push({
        id:key,
        name:data[key].name,
        description:data[key].description,
        price:data[key].price,
      })
    }
    
    setDUMMY_MEAlS(loadMeals);
    setIsLoading(false)
    setError(null)
      }catch(err){
        setError(err.message)
        setIsLoading(false)
        console.log(err.message)
      }
      
    }
    fetchData();
    
  },[])
  if(isLoading){
    return (<section className={classes.mealsLoading}>
      <p>is loading ....</p>
    </section>);
  }
  if(error) {
    return (<section className={classes.mealsError}>
      <p>{error}</p>
    </section>);
  }
    console.log('test')
    const mealList = DUMMY_MEALS.map(meal => <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price ={meal.price}/>);
    return <section className={classes.meals}>
        <Card>
            <ul>
                {mealList}
            </ul>
        </Card>
    </section>
}

export default AvailableMeals;