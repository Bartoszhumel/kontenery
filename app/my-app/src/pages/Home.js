import React from 'react'

export default function Home() {
    return (
        <body>
        <div className="App" style={{backgroundImage: "url('pizzeria.png')", height: "100vh", backgroundSize: "cover"}}>
            <h1 style={{color: "white", fontSize: "50px"}}>Nasza pizzeria</h1>
            <p style={{color: "white", fontSize: "20px"}}>Smakuj włoską tradycję w naszej przytulnej
                pizzerii!<br/> Serwujemy autentyczne włoskie pizze przygotowane z najwyższą starannością i najlepszych
                składników. Nasze wyjątkowe ciasto jest cienkie, chrupiące i doskonale zbalansowane. <br/>Oferujemy
                szeroki wybór pysznych kombinacji smakowych, które zadowolą nawet najbardziej wymagające
                podniebienia.<br/> Zapraszamy do naszej pizzerii, aby rozkoszować się aromatem świeżo upieczonej pizzy,
                w miłej i przyjaznej atmosferze. Czekamy na Ciebie!</p>

        </div>
        </body>
    );
}