import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChangingProgressProvider from "../Layouts/ChangingProgressProvider";
function Splash() {
    const percentage = 66;
    return (
        <div className="container padding_top_5">
            <div className="container__row">
                <div className="container__col-md-al-12">
                    <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
                        {percentage => (
                            <CircularProgressbarWithChildren styles={buildStyles({
                                pathColor: "purple",
                                marginTop: 0,
                                trailColor: "transparent",
                            })}
                                className="progressbar-logo" value={percentage}>
                                <div className="logo-screen-round-progressbar">
                                    <img src={require('../../assets/img/logo_Dp_Extend.png')} alt='Detalle perfecto' />
                                </div>
                            </CircularProgressbarWithChildren>
                        )}
                    </ChangingProgressProvider>
                </div>
            </div>
        </div>
    )
}

export default Splash;