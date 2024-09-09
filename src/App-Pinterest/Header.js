import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBell, faCommentDots, faAngleDown, faEllipsis, faXmark, faPenToSquare, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const Header = ({
  activeButton, handleClick, menuVisible, setMenuVisible, 
  handleHomeClick, handleExploreClick, handleCrearClick, 
  handleSearch, handleIconClick, handleMessageIconClick,
  messageMenuActive, menuActive, menuFocused, handleFocus, handleBlur,
  messageMenuFocused, handleMessageFocus, handleMessageBlur, 
  pins, iconRef, messageIconRef, menuRef, messageMenuRef
}) => (
  <header>
    <img className='pinterest' alt='pinterest' src='https://cdn-icons-png.flaticon.com/128/220/220214.png'></img>
    <div className='botones'>
      <div onClick={handleHomeClick}>
        <button
          className={`header-button boton-1 ${activeButton === 0 ? 'active' : ''}`}
          onClick={() => handleClick(0)}
          aria-pressed={activeButton === 0}
        >
          Inicio
        </button>
      </div>
      <div onClick={handleExploreClick}>
        <button
          className={`header-button boton-2 ${activeButton === 1 ? 'active' : ''}`}
          onClick={() => handleClick(1)}
          aria-pressed={activeButton === 1}
        >
          Explorar
        </button>
      </div>
      <div onClick={handleCrearClick}>
        <button
          className={`header-button boton-3 ${activeButton === 2 ? 'active' : ''}`}
          onClick={() => handleClick(2)}
          aria-pressed={activeButton === 2}
        >
          Crear
        </button>
      </div>
      {menuVisible && (
        <div className="menu-botones">
          <div
            className={`header-button-2 ${activeButton === 0 ? 'active' : ''}`}
            onClick={handleHomeClick}
          >
            Inicio
          </div> 
          <div
            className={`header-button-2 ${activeButton === 1 ? 'active' : ''}`}
            onClick={handleExploreClick}
          >
            Explorar
          </div> 
          <div
            className={`header-button-2 ${activeButton === 2 ? 'active' : ''}`}
            onClick={handleCrearClick}
          >
            Crear
          </div>
        </div>
      )}
    </div>
    <input placeholder='Buscar' onChange={handleSearch}></input>
    <FontAwesomeIcon className='icon-busqueda' icon={faMagnifyingGlass} />
    <div className='iconos'>
      <div className={`tamaño-iconos ${messageMenuActive ? 'disabled' : ''}`} 
        ref={iconRef} 
        onClick={handleIconClick}
      >
        <FontAwesomeIcon className='icons ventana' icon={faBell} />
      </div>
      <div className='tamaño-iconos' ref={messageIconRef} onClick={handleMessageIconClick}>
        <FontAwesomeIcon className='icons mensajes' icon={faCommentDots} />
      </div>
      <div className='tamaño-iconos'>
        <p className='circulo'>J</p>
      </div>
      <div className='tamaño-iconos-ultimo'>
        <FontAwesomeIcon className='abajo' icon={faAngleDown} />
      </div>
    </div>
    <div 
      className={`campanita ${menuActive ? 'active' : ''} ${menuFocused ? 'focused' : ''}`} 
      ref={menuRef} 
      tabIndex={-1} 
      onFocus={handleFocus} 
      onBlur={handleBlur}
    >
      <div className={`actualizaciones ${menuFocused ? 'focused' : ''}`}>
        <p>Actualizaciones</p>
        <hr></hr>
      </div>
      <div className={`cuadro-abajo ${menuFocused ? 'focused' : ''}`}>
        <hr className='raya-cuadro'></hr>
      </div>
      <div className='pin-board-notificaciones'>
        {pins.length > 0 ? (
          pins.map((pin, index) => (
            <div key={index} className='pin-2'>
              <img src={pin.urls.small} alt={pin.alt_description} />
              <p>{pin.description || pin.alt_description}</p>
              <span className='icon-container'>  
                <FontAwesomeIcon className='tres-puntos-2' icon={faEllipsis} />
              </span>
            </div> 
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
    {messageMenuActive && (
      <div 
        ref={messageMenuRef} 
        className={`mensaje-menu ${messageMenuFocused ? 'focused' : ''}`}
        tabIndex={-1}
        onFocus={handleMessageFocus}
        onBlur={handleMessageBlur}
      >
        <div className='mensaje-contenidos'>
          <FontAwesomeIcon className='fax' icon={faXmark} />  
          <p>Buzón de entrada</p>
          <div>
            <FontAwesomeIcon className='tres-puntos-tres' icon={faEllipsis}/> 
          </div>
        </div>
        <div className='mensajes-enviar'>
          <FontAwesomeIcon className='escribir' icon={faPenToSquare} />
          <p>Mensaje nuevo</p>
        </div>
        <div className='mensajes-enviar'>
          <FontAwesomeIcon className='add' icon={faUserPlus} />
          <div>
            <p>Invita a tus amigos</p>
            <p className='p-chatear'>Conectense para comenzar a chatear</p>
          </div>
        </div>
      </div>
    )}
  </header>
);

export default Header;
