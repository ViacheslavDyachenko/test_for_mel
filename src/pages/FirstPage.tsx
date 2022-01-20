import PersonageTile from "components/PersonageTile";
import React from "react"
import { StarWarsStore } from "store/StarWarsStore/StarWarsStore";
import style from "./FirstPage.module.scss"

interface IProps {
    
}

interface IState {
    personageTile: {
        name: string,
        height: string,
        mass: string,
        hairColor: string,
        skinColor: string,
        eyeColor: string,
        birthYear: string,
        gender: string,
        homeworld: string
    }[]
  }

class FirstPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            personageTile: [{
                name: '',
                height: '',
                mass: '',
                hairColor: '',
                skinColor: '',
                eyeColor: '',
                birthYear: '',
                gender: '',
                homeworld: '',
            }]
        };
    }
    starWars = new StarWarsStore();
    async componentDidMount() {
        const result = await this.starWars.getPersonageNextList({people: 'people'}, 1);
        this.setState({
            personageTile: result.data
        })        
    }
    render(): React.ReactNode {
        return (
            <>
                {this.state.personageTile.map((item, index) => {
                    return <PersonageTile 
                        index={index}
                        key={item.name}
                        name={item.name}
                        height={item.height} 
                        mass={item.mass} 
                        hairColor={item.hairColor}
                        skinColor={item.skinColor} 
                        eyeColor={item.eyeColor}
                        birthYear={item.birthYear}
                        gender={item.gender}
                        homeworld={item.homeworld}
                    />
                })}
            </>
        )
    }
}
export default FirstPage;