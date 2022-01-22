import Button from "components/Button";
import StarIcon from "components/StarIcon";
import React from "react";
import { Link } from "react-router-dom";
import { StarWarsStore } from "store/StarWarsStore/StarWarsStore";
import style from "./PersonageTile.module.scss"

interface IProps {
    name: string,
    height: string,
    mass: string,
    hairColor: string,
    skinColor: string,
    eyeColor: string,
    birthYear: string,
    gender: string,
    homeworld: string,
    index: number,
    url: string,
    favorite: boolean,
    onClick: (event: React.MouseEvent) => void,
    removeFavorites?: (event: React.MouseEvent) => void,
}

interface IState {
    name: string,
    favorite: boolean
}

class PersonageTile extends React.Component<IProps, IState> {
    _isMounted = false;
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            favorite: this.props.favorite
        };
    }
    starWars = new StarWarsStore();
    async componentDidMount() {
        this._isMounted = true;
        if(this.props.homeworld) {
            const result = await this.starWars.getHomeworldNextList(this.props.homeworld.replace('https://swapi.dev/api/', ''));
            if(this._isMounted) {        
                this.setState({name: result.data}); 
            }
        }       
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    favoritesIcon: boolean = localStorage ? Boolean(localStorage.getItem(this.props.name)): false;

    addFavorites = (event: React.MouseEvent) => {
        if(!this.favoritesIcon) {
            this.favoritesIcon = true;
            this.setState({
                name: this.state.name,
                favorite: true
            })
        } else {
            this.favoritesIcon = false;
            this.setState({
                name: this.state.name,
                favorite: false
            })
        }

        const saveProps = {
            name: this.props.name,
            height: this.props.height,
            mass: this.props.mass,
            hairColor: this.props.hairColor,
            skinColor: this.props.skinColor,
            eyeColor: this.props.eyeColor,
            birthYear: this.props.birthYear,
            gender: this.props.gender,
            homeworld: this.props.homeworld,
            url: this.props.url
        }

        if(!this.state.favorite) {
            localStorage.setItem(this.props.name, JSON.stringify(saveProps))
        } else {
            localStorage.removeItem(this.props.name)
        }
        if(this.props.removeFavorites) this.props.removeFavorites(event);
    }

    render(): React.ReactNode {         
        return (
            this.props.index % 2
            ? <div className={style.tile}>
                <div className={style.tile__content}>
                    <StarIcon favoritesIcon={this.favoritesIcon} onClick={this.addFavorites} className={style.tile__star_btn} />
                    <p className={style.tile__content_name}>Имя: {this.props.name}</p>
                    <p className={style.tile__content_height}>Рост: {this.props.height}</p>
                    <p className={style.tile__content_mass}>Вес: {this.props.mass}</p>
                    <p className={style.tile__content_hair_color}>Цвет волос: {this.props.hairColor}</p>
                    <p className={style.tile__content_skin_color}>Цвет кожи: {this.props.skinColor}</p>
                    <p className={style.tile__content_eye_color}>Цвет глаз: {this.props.eyeColor}</p>
                    <p className={style.tile__content_birth_ear}>Год рождения: {this.props.birthYear}</p>
                    <p className={style.tile__content_gender}>Пол: {this.props.gender}</p>
                    <p className={style.tile__content_homeworld}>Родная планета: {this.state.name}</p>
                </div>
                <Link className={style.tile__link} 
                to={this.state.favorite 
                    ? `/favorites/${this.props.url.replace("https://swapi.dev/api/people/", "")}`
                    : `/${this.props.url.replace("https://swapi.dev/api/people/", "")}`}><Button onClick={this.props.onClick} text="Узнать больше" buttonClassName="tile__btn" /></Link>
            </div>
            : <div className={style.tile_white}>
                <div className={style.tile_white__content}>
                <StarIcon favoritesIcon={this.favoritesIcon} onClick={this.addFavorites} className={style.tile__star_btn} />
                    <p className={style.tile_white__content_name_white}>Имя: {this.props.name}</p>
                    <p className={style.tile_white__content_height_white}>Рост: {this.props.height}</p>
                    <p className={style.tile_white__content_mass_white}>Вес: {this.props.mass}</p>
                    <p className={style.tile_white__content_hair_color_white}>Цвет волос: {this.props.hairColor}</p>
                    <p className={style.tile_white__content_skin_color_white}>Цвет кожи: {this.props.skinColor}</p>
                    <p className={style.tile_white__content_eye_color_white}>Цвет глаз: {this.props.eyeColor}</p>
                    <p className={style.tile_white__content_birth_ear_white}>Год рождения: {this.props.birthYear}</p>
                    <p className={style.tile_white__content_gender_white}>Пол: {this.props.gender}</p>
                    <p className={style.tile_white__content_homeworld_white}>Родная планета: {this.state.name}</p>
                </div>
                <Link className={style.tile__link} 
                to={this.state.favorite 
                    ? `/favorites/${this.props.url.replace("https://swapi.dev/api/people/", "")}`
                    : `/${this.props.url.replace("https://swapi.dev/api/people/", "")}`}><Button onClick={this.props.onClick} text="Узнать больше" buttonClassName="tile_white__btn_white" /></Link>
            </div>
        )
    }
}
export default PersonageTile;