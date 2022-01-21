import FirstPage from "pages/FirstPage";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { StarWarsStore } from "store/StarWarsStore/StarWarsStore";
import style from "./DetailsPage.module.scss"
interface IProps {
    params?: any,
    onClick: (event: React.MouseEvent) => void
}
interface IState {
    name: string;
    height: string;
    mass: string;
    hairColor: string;
    skinColor: string;
    eyeColor: string;
    birthYear: string;
    gender: string;
    homeworld: string;
    isLoad: boolean
}

function withParams(Component: any) {
    return (props: IProps) => <Component {...props} params={useParams()} />;
  }

class DetailsPage extends React.Component<IProps, IState> {
    _isMounted = false;
    constructor(props: IProps) {
        super(props);
        this.state = {
            name: '',
            height: '',
            mass: '',
            hairColor: '',
            skinColor: '',
            eyeColor: '',
            birthYear: '',
            gender: '',
            homeworld: '',
            isLoad: false
        }
    }
    starWars = new StarWarsStore();

    async componentDidMount() {
        this._isMounted = true;
        const personageUrl = this.props.params;
        const result = await this.starWars.getPersonageInfo({people: 'people'}, personageUrl.url);
        if(this._isMounted) this.setState({...result.data, isLoad: false});
    }

    async componentDidUpdate() {
        if(this.state.isLoad) return;
        if(this.state.homeworld) {
            const result = await this.starWars.getHomeworldNextList(this.state.homeworld.replace('https://swapi.dev/api/', ''));      
            this.setState({
                name: this.state.name,
                height: this.state.height,
                mass: this.state.mass,
                hairColor: this.state.hairColor,
                skinColor: this.state.skinColor,
                eyeColor: this.state.eyeColor,
                birthYear: this.state.birthYear,
                gender: this.state.gender,
                homeworld: result.data,
                isLoad: true
            }); 
        }  
    }
    componentWillUnmount() {
        this._isMounted = false;
      }

    render(): React.ReactNode {
        return (
            <>
                <div className={style.modal_window_bg}>
                    <div className={style.modal_window}>
                    <button onClick={this.props.onClick} className={style.modal_window__close_btn}><Link className={style.modal_window__close_btn_link} to="/">X</Link></button>
                        <h1 className={style.modal_window__title}>Детальная информация</h1>
                        <div className={style.modal_window__content}>
                            <p className={style.modal_window__content_name}>Имя: {this.state.name}</p>
                            <p className={style.modal_window__content_height}>Рост: {this.state.height}</p>
                            <p className={style.modal_window__content_mass}>Вес: {this.state.mass}</p>
                            <p className={style.modal_window__content_hair_color}>Цвет волос: {this.state.hairColor}</p>
                            <p className={style.modal_window__content_skin_color}>Цвет кожи: {this.state.skinColor}</p>
                            <p className={style.modal_window__content_eye_color}>Цвет глаз: {this.state.eyeColor}</p>
                            <p className={style.modal_window__content_birth_ear}>Год рождения: {this.state.birthYear}</p>
                            <p className={style.modal_window__content_gender}>Пол: {this.state.gender}</p>
                            <p className={style.modal_window__content_homeworld}>Родная планета: {this.state.homeworld}</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default withParams(DetailsPage);