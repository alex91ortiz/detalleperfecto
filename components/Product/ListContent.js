
function ListContent({ content }) {

    return (
        <div className="container__row container__col-md-12 container__col-lg-12">
            {
                content.map(material => {
                    return <div className="panel-card-container  container__col-md-al-4 container__col-lg-al-4" key={material.id}>
                        <div className="panel-card">
                            <img className="panel-card-img container__col-md-2" src={material.image} />
                            <div className="panel-card-text container__col-md-2"><p>{material.nombre}</p></div>
                            <div className="panel-card-text container__col-md-2"><h3>{material.categoria}</h3></div>
                            <div className="panel-card-text container__col-md-2"><p>${material.precio }</p></div>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default ListContent;