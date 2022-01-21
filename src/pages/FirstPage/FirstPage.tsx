import Button from "components/Button";
import PersonageTile from "components/PersonageTile";
import DetailsPage from "pages/DetailsPage";
import React from "react"
import { StarWarsStore } from "store/StarWarsStore/StarWarsStore";
import style from "./FirstPage.module.scss"

interface IProps {
    showDetails: boolean
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
        homeworld: string,
        url: string
    }[],
    page: number,
    everythingIsLoaded: boolean,
    showDetails: boolean
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
                url: ''
            }],
            page: 1,
            everythingIsLoaded: false,
            showDetails: this.props.showDetails
        };
    }
    starWars = new StarWarsStore();
    async componentDidMount() {
        const result = await this.starWars.getPersonageNextList({people: 'people'}, this.state.page);
        let personageList = this.state.personageTile.concat(result.data.personage).filter(item => Boolean(item.name));
        this.setState({
            personageTile: personageList,
            page: this.state.page + 1,
            everythingIsLoaded: +personageList.length === +result.data.count,
            showDetails: this.props.showDetails
        })        
    }

    onClick = async () => {
        const result = await this.starWars.getPersonageNextList({people: 'people'}, this.state.page);
        let personageList = this.state.personageTile.concat(result.data.personage)
        this.setState({
            personageTile: personageList,
            page: this.state.page + 1,
            everythingIsLoaded: +personageList.length === +result.data.count,
            showDetails: this.props.showDetails
        });
    }

    showDetails = (event: React.MouseEvent): void => {
        this.setState({
            personageTile: this.state.personageTile,
            page: this.state.page,
            everythingIsLoaded: this.state.everythingIsLoaded,
            showDetails: true
        })
    }
    hiddenDetails = (event: React.MouseEvent): void => {
        this.setState({
            personageTile: this.state.personageTile,
            page: this.state.page,
            everythingIsLoaded: this.state.everythingIsLoaded,
            showDetails: false
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
                        url={item.url}
                        onClick={this.showDetails}
                    />
                })}
                {this.state.showDetails
                && <DetailsPage onClick={this.hiddenDetails} />}
                {!this.state.everythingIsLoaded
                && <Button onClick={this.onClick} className={style.btn_position} buttonClassName="tile_white__btn_white" text="Загрузить ещё" />}
            </>
        )
    }
}
export default FirstPage;