import Button from "components/Button";
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
    }[],
    page: number,
    everythingIsLoaded: boolean
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
            }],
            page: 1,
            everythingIsLoaded: false
        };
    }
    starWars = new StarWarsStore();
    async componentDidMount() {
        const result = await this.starWars.getPersonageNextList({people: 'people'}, this.state.page);
        let personageList = this.state.personageTile.concat(result.data.personage).filter(item => Boolean(item.name));
        this.setState({
            personageTile: personageList,
            page: this.state.page + 1,
            everythingIsLoaded: this.state.personageTile.length.toString() === result.data.count.toString()
        })        
    }

    onClick = async () => {
        const result = await this.starWars.getPersonageNextList({people: 'people'}, this.state.page);
        let personageList = this.state.personageTile.concat(result.data.personage).filter(item => Boolean(item.name));
        this.setState({
            personageTile: personageList,
            page: this.state.page + 1,
            everythingIsLoaded: +personageList.length === +result.data.count
        });
        console.log(+personageList.length === +result.data.count);
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
                {!this.state.everythingIsLoaded
                && <Button onClick={this.onClick} className={style.btn_position} buttonClassName="tile_white__btn_white" text="Загрузить ещё" />}
            </>
        )
    }
}
export default FirstPage;