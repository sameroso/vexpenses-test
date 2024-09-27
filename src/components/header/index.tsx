import { HeaderContainer, HeaderItemsContainer, HeaderText } from './styles'
import { vexpensesLogo } from './vexpenses-logo'

export const Header = () => {
    return (
        <HeaderContainer>
            <HeaderItemsContainer>
                <img src={vexpensesLogo} />
                <HeaderText>Gerenciador de Fornecedores</HeaderText>
            </HeaderItemsContainer>
        </HeaderContainer>
    )
}
