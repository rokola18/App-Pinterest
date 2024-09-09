import React, { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsis, faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import Explore from './Explore'; // Importa el componente Explore
import Crear from './Crear'; // Importa el componente Crear
import Header from './Header';


const MainContent1 = () => {
  // Estado para gestionar el botón activo en el encabezado
  const [activeButton, setActiveButton] = useState(null);

  // Nuevo estado para gestionar la visibilidad del menú en pantallas pequeñas
  const [menuVisible, setMenuVisible] = useState(false);

  // Estados y referencias para los menús existentes
  const [messageMenuActive, setMessageMenuActive] = useState(false);
  const messageIconRef = useRef(null);
  const messageMenuRef = useRef(null);
  const [messageMenuFocused, setMessageMenuFocused] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const iconRef = useRef(null);
  const [menuFocused, setMenuFocused] = useState(false);
  const menuRef = useRef(null);

  // Estado para gestionar los pines
  const [pins, setPins] = useState([]);

   // Estado para controlar qué contenido mostrar (home, explore, notifications)
  const [showContent, setShowContent] = useState('home'); 

  // Clave de acceso para la API de Unsplash y configuración de la paginación
  const UNSPLASH_ACCESS_KEY = 'PcFs3zGsaYVjhmyuHDY1EhbfX759CtYURD4JYCI3EwI';
  const perPage = 20;
  const [page, setPage] = useState(1);

  // useEffect para obtener las imágenes de la API de Unsplash
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/photos?client_id=${UNSPLASH_ACCESS_KEY}&per_page=${perPage}&page=${page}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setPins(prevPins => [...prevPins, ...data]);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();

    // Función para manejar los clics fuera de los menús
    const handleClickOutside = (e) => {
      if (
          iconRef.current && !iconRef.current.contains(e.target) &&
          menuRef.current && !menuRef.current.contains(e.target)
      ) {
          setMenuActive(false);
          setMenuFocused(false);
      }
      if (
          messageIconRef.current && !messageIconRef.current.contains(e.target) &&
          messageMenuRef.current && !messageMenuRef.current.contains(e.target)
      ) {
          setMessageMenuActive(false);
          setMessageMenuFocused(false); 
      }
      // Cerrar el menú de botones en pantallas pequeñas si se hace clic fuera
      if (menuVisible && !e.target.closest('.botones')) {
        setMenuVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [page, menuVisible]);

  // Función para manejar el clic en el ícono de menú
  const handleIconClick = (e) => {
    e.stopPropagation();
    setMenuActive(prevState => !prevState);
  };

  // Función para manejar el clic en el ícono de mensajes
  const handleMessageIconClick = (e) => {
    e.stopPropagation();
    setMessageMenuActive(prevState => !prevState);
  };

  // Función para manejar el clic en los botones del encabezado
  const handleClick = (index) => {
    setActiveButton(index);
    if (window.innerWidth <= 800 && index === 0) { // Solo en pantallas pequeñas y si se hace clic en "Inicio"
      setMenuVisible(prev => !prev);
    } else {
      setMenuVisible(false); // Cerrar el menú si se hace clic en otros botones o en pantallas grandes
    }
  };

  // Función para manejar el scroll y cargar más imágenes al llegar al final de la página
  const handleScroll = () => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottom) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Configuración de columnas para el componente Masonry
  const breakpointColumnsObj = {
    default: 6,
    1500: 5,
    1200: 4,
    900: 3,
    600: 2,
    400: 1 
  };

  // Función para manejar la búsqueda de pines
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setPins((prevPins) => prevPins.filter(pin => 
      (pin.description && pin.description.toLowerCase().includes(query)) ||
      (pin.alt_description && pin.alt_description.toLowerCase().includes(query))
    ));
  };

  // Funciones para manejar el enfoque y desenfoque del menú de mensajes
  const handleMessageFocus = () => {
    setMessageMenuFocused(true);
  };

  const handleMessageBlur = () => {
    setMessageMenuFocused(false);
  };

  // Funciones para manejar el enfoque y desenfoque del menú general
  const handleFocus = () => {
    setMenuFocused(true);
  };

  const handleBlur = () => {
    setMenuFocused(false);
  };

  // Estado para manejar la carga de imágenes
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };


  const handleHomeClick = () => {
    setShowContent('home'); // Muestra la sección Home
  };

  const handleExploreClick = () => {
    setShowContent('explore'); // Muestra la sección Explore
  };

  const handleCrearClick = () => {
    setShowContent('crear'); // Muestra la sección Explore
  };

  return (
    <div>


<Header
        activeButton={activeButton}
        handleClick={handleClick}
        menuVisible={menuVisible}
        setMenuVisible={setMenuVisible}
        handleHomeClick={handleHomeClick}
        handleExploreClick={handleExploreClick}
        handleCrearClick={handleCrearClick}
        handleSearch={handleSearch}
        handleIconClick={handleIconClick}
        handleMessageIconClick={handleMessageIconClick}
        messageMenuActive={messageMenuActive}
        menuActive={menuActive}
        menuFocused={menuFocused}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        messageMenuFocused={messageMenuFocused}
        handleMessageFocus={handleMessageFocus}
        handleMessageBlur={handleMessageBlur}
        pins={pins}
        iconRef={iconRef}
        messageIconRef={messageIconRef}
        menuRef={menuRef}
        messageMenuRef={messageMenuRef}
      />

      
    {showContent === 'home' && ( 
      <>
      <Masonry
         className="pin-board"
         columnClassName="pin-board_column"
         breakpointCols={breakpointColumnsObj}
      >
        {pins.length > 0 ? (
          pins.map((pin, index) => (
            <div key={index} className='pin'>
              <div className='pin-content'>
                 {loading && <div className="image-placeholder"></div>}
                 <img src={pin.urls.small} alt={pin.alt_description} onLoad={handleImageLoad} />
              </div>
              <div className="pin-overlay">
                <div className='cabeza-img'>
                  <a href={pin.urls.full} target="_blank" rel="noopener noreferrer">Ir a la imagen</a>
                  <button>Guardar</button>
                </div>
                <div className='iconos-img'>
                 <FontAwesomeIcon className='descarga' icon={faArrowRightFromBracket} style={{color: "black", backgroundColor: 'white'}} /> 
                 <FontAwesomeIcon className='tres-puntos' icon={faEllipsis} style={{color: "black", backgroundColor: 'white'}} />
                </div>
              </div>
            </div> 
          )) 
        ) : (
          <p>Loading...</p>
        )}
        
      </Masonry>
      </>
      )}

      {showContent === 'explore' && <Explore />} 
      {showContent === 'crear' && <Crear />} 

    </div>
  );
}

export default MainContent1;
