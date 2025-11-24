import './style.css';

function Footer() {
  const anoAtual = new Date().getFullYear();
  return (
    <footer className='footer-container'>
            <div>
                &copy; {new Date().getFullYear()} - Todos os direitos reservados
            </div>
        </footer>
  );
}

export default Footer;