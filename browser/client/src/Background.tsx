import "./Background.css";

const letterCards = ["J", "Q", "K"];

function Background () {
    const renderHearts = () => {
        const cards = [];
        cards.push(
            <img key="AH" src={require(`./assets/cards/hearts/AH.png`)} alt="card" />
        );
        for (let i = 2; i <= 10; i++) {
            cards.push(
                <img key={i} src={require(`./assets/cards/hearts/${i}H.png`)} alt="card" />
            );
        }
        for (let i = 0; i < letterCards.length; i++) {
            cards.push(
                <img key={letterCards[i]} src={require(`./assets/cards/hearts/${letterCards[i]}H.png`)} alt="card" />
            );
        }
        return (<div className="flex flex-col">${cards}</div>);
    }
    
    const renderDiamonds = () => {
        const cards = [];
        cards.push(
            <img key="AD" src={require(`./assets/cards/diamonds/AD.png`)} alt="card" />
        );
        for (let i = 2; i <= 10; i++) {
            cards.push(
                <img key={i} src={require(`./assets/cards/diamonds/${i}D.png`)} alt="card" />
            );
        }
        for (let i = 0; i < letterCards.length; i++) {
            cards.push(
                <img key={letterCards[i]} src={require(`./assets/cards/diamonds/${letterCards[i]}D.png`)} alt="card" />
            );
        }
        return (<div className="flex flex-col">${cards}</div>);
    }

    const renderClubs = () => {
        const cards = [];
        cards.push(
            <img key="AC" src={require(`./assets/cards/clubs/AC.png`)} alt="card" />
        );
        for (let i = 2; i <= 10; i++) {
            cards.push(
                <img key={i} src={require(`./assets/cards/clubs/${i}C.png`)} alt="card" />
            );
        }
        for (let i = 0; i < letterCards.length; i++) {
            cards.push(
                <img key={letterCards[i]} src={require(`./assets/cards/clubs/${letterCards[i]}C.png`)} alt="card" />
            );
        }
        return (<div className="flex flex-col">${cards}</div>);
    }

    const renderSpades = () => {
        const cards = [];
        cards.push(
            <img key="AS" src={require(`./assets/cards/spades/AS.png`)} alt="card" />
        );
        for (let i = 2; i <= 10; i++) {
            cards.push(
                <img key={i} src={require(`./assets/cards/spades/${i}S.png`)} alt="card" />
            );
        }
        for (let i = 0; i < letterCards.length; i++) {
            cards.push(
                <img key={letterCards[i]} src={require(`./assets/cards/spades/${letterCards[i]}S.png`)} alt="card" />
            );
        }
        return (<div className="flex flex-col">${cards}</div>);
    }

    return (
        <div className="bg-black fixed inset-0 z-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {renderHearts()}
                {renderSpades()}
                {renderDiamonds()}
                {renderClubs()}
            </div>
        </div>
    );
}

export default Background;