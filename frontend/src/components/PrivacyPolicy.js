import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivacyPolicy.css'; 

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    const handleAccept = () => {
        navigate('/login');
    };

    return (
        <div className="privacy-policy-container">
            <h1>Políticas de Privacidad</h1>
            <p>
                Última actualización: 3/8/2024
            </p>
            <p>
                Bienvenido a ConectUS. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando utiliza nuestra aplicación y nuestros servicios. Al utilizar nuestra aplicación, usted acepta los términos de esta política.
            </p>
            <h2>1. Información que Recopilamos</h2>
            <p>
                Recopilamos información que usted nos proporciona directamente, como cuando se registra en nuestra aplicación, utiliza nuestros servicios o se comunica con nosotros. Esta información puede incluir:
            </p>
            <ul>
                <li>Datos de identificación personal (nombre, dirección de correo electrónico, número de teléfono, etc.)</li>
                <li>Datos de cuenta (nombre de usuario, contraseña, etc.)</li>
                <li>Información de uso (historial de actividad, preferencias, etc.)</li>
            </ul>
            <h2>2. Uso de la Información</h2>
            <p>
                Usamos la información que recopilamos para:
            </p>
            <ul>
                <li>Proporcionar y mantener nuestros servicios</li>
                <li>Mejorar la funcionalidad y la experiencia de usuario</li>
                <li>Comunicarnos con usted sobre actualizaciones, promociones y noticias</li>
                <li>Responder a sus consultas y brindar soporte</li>
            </ul>
            <h2>3. Compartición de Información</h2>
            <p>
                No compartimos su información personal con terceros, excepto en las siguientes circunstancias:
            </p>
            <ul>
                <li>Con proveedores de servicios que nos ayudan a operar y mantener nuestra aplicación</li>
                <li>Para cumplir con las leyes y regulaciones aplicables</li>
                <li>Para proteger nuestros derechos, privacidad y seguridad, y los de nuestros usuarios</li>
            </ul>
            <h2>4. Seguridad</h2>
            <p>
                Implementamos medidas de seguridad para proteger su información personal contra accesos no autorizados, alteraciones y divulgación. Sin embargo, no podemos garantizar la seguridad absoluta de la información transmitida a través de Internet.
            </p>
            <h2>5. Sus Derechos</h2>
            <p>
                Usted tiene derecho a:
            </p>
            <ul>
                <li>Acceder a la información que tenemos sobre usted</li>
                <li>Solicitar la corrección o eliminación de su información</li>
                <li>Optar por no recibir comunicaciones promocionales</li>
            </ul>
            <p>
                Para ejercer estos derechos, por favor contáctenos a través de la información de contacto proporcionada al final de esta política.
            </p>
            <h2>6. Cambios en esta Política</h2>
            <p>
                Podemos actualizar esta Política de Privacidad de vez en cuando. Cualquier cambio se publicará en esta página y, si es necesario, le notificaremos por correo electrónico o mediante un aviso en nuestra aplicación.
            </p>
            <h2>7. Contacto</h2>
            <p>
                Si tiene alguna pregunta o inquietud sobre esta Política de Privacidad, por favor contáctenos en:
            </p>
            <ul>
                <li><strong>Correo electrónico:</strong> conectus@brevo.com</li>
            </ul>
            <div className="accept-container">
                <p>
                    Para poder iniciar sesión en ConectUS, debe aceptar nuestras Políticas de Privacidad. Por favor lea la política detenidamente antes de aceptar.
                </p>
                <button className="accept-button" onClick={handleAccept}>
                    Acepto las Políticas de Privacidad
                </button>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
