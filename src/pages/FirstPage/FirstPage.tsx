import Button from "components/Button";
import Header from "components/Header";
import Loader from "components/Loader";
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
    isLoaded: boolean,
    everythingIsLoaded: boolean,
    showDetails: boolean
  }

class FirstPage extends React.Component<IProps, IState> {
    _isMounted = false;
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
            isLoaded: false,
            everythingIsLoaded: false,
            showDetails: this.props.showDetails
        };
    }
    starWars = new StarWarsStore();
    async componentDidMount() {
        this._isMounted = true;
        const result = await this.starWars.getPersonageNextList({people: 'people'}, this.state.page);
        let personageList = this.state.personageTile.concat(result.data.personage).filter(item => Boolean(item.name));
        if(this._isMounted) {
            this.setState({
                personageTile: personageList,
                page: this.state.page + 1,
                isLoaded: true,
                everythingIsLoaded: +personageList.length === +result.data.count,
                showDetails: this.props.showDetails
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onClick = async () => {
        this.setState({
            personageTile: this.state.personageTile,
            page: this.state.page,
            isLoaded: false,
            everythingIsLoaded: this.state.everythingIsLoaded,
            showDetails: this.state.showDetails
        })
        const result = await this.starWars.getPersonageNextList({people: 'people'}, this.state.page);
        let personageList = this.state.personageTile.concat(result.data.personage)
        this.setState({
            personageTile: personageList,
            page: this.state.page + 1,
            isLoaded: true,
            everythingIsLoaded: +personageList.length === +result.data.count,
            showDetails: this.props.showDetails
        });
    }

    showDetails = (event: React.MouseEvent): void => {
        this.setState({
            personageTile: this.state.personageTile,
            page: this.state.page,
            isLoaded: true,
            everythingIsLoaded: this.state.everythingIsLoaded,
            showDetails: true
        })
    }
    hiddenDetails = (event: React.MouseEvent): void => {
        this.setState({
            personageTile: this.state.personageTile,
            page: this.state.page,
            isLoaded: true,
            everythingIsLoaded: this.state.everythingIsLoaded,
            showDetails: false
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Header page="main"/>
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
                        favorite={false}
                        onClick={this.showDetails}
                    />
                })}
                {this.state.showDetails
                && <DetailsPage favorite={false} onClick={this.hiddenDetails} />}
                {!this.state.isLoaded && <Loader style="block" height="50px" width="50px" />}
                {!this.state.everythingIsLoaded
                && <Button disabled={!this.state.isLoaded} onClick={this.onClick} className={style.btn_position} buttonClassName="tile_white__btn_white" text="Загрузить ещё" />}
            </>
        )
    }
}
export default FirstPage;