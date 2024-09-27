import { HeaderContainer, HeaderText } from './styles'
import { vexpensesLogo } from './vexpenses-logo'

export const Header = () => {
    return (
        <HeaderContainer>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '',
                }}
            >
                <img src={vexpensesLogo} />
                <HeaderText>Gerenciador de Fornecedores</HeaderText>
            </div>
        </HeaderContainer>
    )
}
