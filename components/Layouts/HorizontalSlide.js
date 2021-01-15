export default function HorizontalSlide({ children }) {
    return <div>
        <div className="app">
            <ul className="hs full no-scrollbar">
                {children}
            </ul>
        </div>
    </div>
}