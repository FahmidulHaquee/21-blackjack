import "./Background.css";
import { shuffleArray } from "./helpers/fischer-yates";

const letterCards = ["J", "Q", "K"];
const numberCards = [2, 3, 4, 5, 6, 7, 8, 9, 10];

function Background () {
    const renderHearts = () => {
        const cards = [];
        shuffleArray(numberCards);
        cards.push(
            <img key="AH" src={require(`./assets/cards/hearts/AH.png`)} alt="card" />
        );
        numberCards.forEach(i => {
            cards.push(
                <img key={i} src={require(`./assets/cards/hearts/${i}H.png`)} alt="card" />
            );
        });
        for (let i = 0; i < letterCards.length; i++) {
            cards.push(
                <img key={letterCards[i]} src={require(`./assets/cards/hearts/${letterCards[i]}H.png`)} alt="card" />
            );
        }
        return (<div className="flex flex-col w-80 h-auto">${cards}</div>);
    }
    
    const renderDiamonds = () => {
        const cards = [];
        shuffleArray(numberCards);        
        numberCards.forEach(i => {
            cards.push(
                <img key={i} src={require(`./assets/cards/diamonds/${i}D.png`)} alt="card" />
            );
        });
        cards.push(
            <img key="AD" src={require(`./assets/cards/diamonds/AD.png`)} alt="card" />
        );
        for (let i = 0; i < letterCards.length; i++) {
            cards.push(
                <img key={letterCards[i]} src={require(`./assets/cards/diamonds/${letterCards[i]}D.png`)} alt="card" />
            );
        }
        return (<div className="flex flex-col w-80 h-auto">${cards}</div>);
    }

    const renderClubs = () => {
        const cards = [];
        shuffleArray(numberCards);
        numberCards.forEach(i => {
            cards.push(
                <img key={i} src={require(`./assets/cards/clubs/${i}C.png`)} alt="card" />
            );
        });
        for (let i = 0; i < letterCards.length; i++) {
            cards.push(
                <img key={letterCards[i]} src={require(`./assets/cards/clubs/${letterCards[i]}C.png`)} alt="card" />
            );
        }
        cards.push(
            <img key="AC" src={require(`./assets/cards/clubs/AC.png`)} alt="card" />
        );
        return (<div className="flex flex-col w-80 h-auto">${cards}</div>);
    }

    const renderSpades = () => {
        const cards = [];
        shuffleArray(numberCards);
        numberCards.forEach(i => {
            cards.push(
                <img key={i} src={require(`./assets/cards/spades/${i}S.png`)} alt="card" />
            );
        });
        cards.push(
            <img key="AS" src={require(`./assets/cards/spades/AS.png`)} alt="card" />
        );
        for (let i = 0; i < letterCards.length; i++) {
            cards.push(
                <img key={letterCards[i]} src={require(`./assets/cards/spades/${letterCards[i]}S.png`)} alt="card" />
            );
        }
        return (<div className="flex flex-col w-80 h-auto animate-move-down animation-duration-10s">${cards}</div>);
    }

    return (
        <div className="flex bg-black fixed inset-0 z-0">
            <div className="flex flex-row grid-cols-4 gap-4 p-4">
                {renderHearts()}
                {renderSpades()}
                {renderDiamonds()}
                {renderClubs()}
                {renderHearts()}
                {renderSpades()}
                {renderDiamonds()}
                {renderClubs()}
            </div>
        </div>
    );
}

export default Background;