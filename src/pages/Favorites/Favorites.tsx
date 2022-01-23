import Button from "components/Button";
import Header from "components/Header"
import PersonageTile from "components/PersonageTile"
import DetailsPage from "pages/DetailsPage"
import React from "react"
import style from "./Favorites.module.scss"

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
    showDetails: boolean
  }

class Favorites extends React.Component<IProps, IState> {
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
            showDetails: this.props.showDetails,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        let localStorageRes: string[] = Object.values(localStorage);
        let result = localStorageRes.map(item => JSON.parse(item))
        let personageList = this.state.personageTile.concat(result).filter(item => Boolean(item.name));
        if(this._isMounted) {
            this.setState({
                personageTile: personageList,
                showDetails: this.props.showDetails,
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    sortTile = (event: React.MouseEvent) => {
        let personageList = this.state.personageTile;
        personageList.sort((firstItem: {name: string}, secondItem: {name: string}) => {
            if(firstItem.name > secondItem.name) {
                return 1;
            } else if(firstItem.name === secondItem.name) {
                return 0
            }
            return -1;
        })
        this.setState({
            personageTile: personageList,
            showDetails: this.props.showDetails,
        })
    }

    showDetails = (event: React.MouseEvent): void => {
        this.setState({
            personageTile: this.state.personageTile,
            showDetails: true,
        })
    }

    hiddenDetails = (event: React.MouseEvent): void => {
        this.setState({
            personageTile: this.state.personageTile,
            showDetails: false,
        })
    }
    removeFavorite = (event: React.MouseEvent) => {
        let localStorageRes: string[] = Object.values(localStorage);
        let result = localStorageRes.map(item => JSON.parse(item))
        this.setState({
            personageTile: result,
            showDetails: this.props.showDetails,
        })
    }

    render(): React.ReactNode {
        return (
            <>
                <Header page="favorites"/>
                <Button onClick={this.sortTile} className={style.favorites__sort_btn} text="Отсортировать по имени" disabled={false} />
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
                        favorite={true}
                        removeFavorites={this.removeFavorite}
                        onClick={this.showDetails}
                    />
                })}
                {this.state.showDetails
                && <DetailsPage favorite={true} onClick={this.hiddenDetails} />}
            </>
        )
    }
} 

export default Favorites;