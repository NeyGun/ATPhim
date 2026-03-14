import { Header } from "../components";

function HeaderOnly({ children }) {
    return ( 
        <div>
            <Header />
            <div className="contaier">
                {children}
            </div>
        </div>
     );
}

export default HeaderOnly;