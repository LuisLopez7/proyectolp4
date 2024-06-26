import React, { useState } from 'react';
import './App.css';

const Feed = () => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            image: '/images/imagen1.jpg',
            title: 'Naturaleza Resplandeciente',
            description: 'Serenidad, Tranquilidad y paz',
            photographer: {
                name: 'Michel user',
                isVerified: false, // Nuevo campo para la verificación del fotógrafo
            },
            likes: 0,
            comments: [],
            ratings: [],
        },
        {
            id: 2,
            image: '/images/imagen2.jpg',
            title: 'Árbol Sabio',
            description: 'Árbol profundo que descansa día y noche',
            photographer: {
                name: 'NigthClose',
                isVerified: false, // Nuevo campo para la verificación del fotógrafo
            },
            likes: 0,
            comments: [],
            ratings: [],
        },
        // Agrega más publicaciones según sea necesario
    ]);

    const handleLike = (postId) => {
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === postId) {
                    return { ...post, likes: post.likes + 1 };
                }
                return post;
            });
        });
    };

    const handleComment = (postId, comment) => {
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === postId) {
                    return { ...post, comments: [...post.comments, comment] };
                }
                return post;
            });
        });
    };

    const handleRating = (postId, rating) => {
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === postId) {
                    if (!post.ratings.find(r => r.author === 'Usuario')) {
                        return { ...post, ratings: [...post.ratings, { stars: rating, author: 'Usuario' }] };
                    }
                }
                return post;
            });
        });
    };

    const handleVerificationRequest = (photographerName) => {
        // Aquí se podría implementar la lógica para solicitar la verificación
        alert(`Solicitud de verificación enviada para ${photographerName}`);
    };

    return (
        <div className="feed-container">
            {posts.map(post => (
                <div key={post.id} className="post">
                    <img src={post.image} alt={post.title} className="post-image"/>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.description}</p>
                    <p className="post-photographer">Por: {post.photographer.name}</p>
                    {post.photographer.isVerified ? (
                        <span className="verified-badge">Verificado</span>
                    ) : (
                        <button onClick={() => handleVerificationRequest(post.photographer.name)} className="btn-verify">Solicitar Verificación</button>
                    )}
                    <div>
                        <button onClick={() => handleLike(post.id)} className="btn-like">Me gusta ({post.likes})</button>
                        <button onClick={() => handleComment(post.id, { text: 'Nuevo comentario', author: 'Usuario' })} className="btn-comment">Comentar</button>
                        <Rating postId={post.id} ratings={post.ratings} onRating={handleRating} />
                    </div>
                </div>
            ))}
        </div>
    );
};

const Rating = ({ postId, ratings, onRating }) => {
    const [rating, setRating] = useState(0);

    const handleRating = (stars) => {
        setRating(stars);
        onRating(postId, stars);
    };

    return (
        <div className="rating">
            <p>Calificar:</p>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                const filled = ratings.some(r => r.stars >= ratingValue);
                return (
                    <button
                        key={index}
                        className={`star ${filled ? 'filled' : ''}`}
                        onClick={() => handleRating(ratingValue)}
                    >
                        ★
                    </button>
                );
            })}
        </div>
    );
};

export default Feed;
