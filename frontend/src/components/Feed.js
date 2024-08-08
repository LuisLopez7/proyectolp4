import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Feed.css';

const Feed = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([
        {
            id: 1,
            image: 'prueba1.jpg',
            title: 'Nuevo Corte',
            description: 'Serenidad, Tranquilidad y paz',
            photographer: {
                name: 'Pablito Morata',
                profileImage: '3135768.png',
                isVerified: false,
                followers: 0,
                isFollowed: false,
            },
            likes: 0,
            liked: false,
            comments: [],
            ratings: [],
            showCommentSection: false, // Estado inicial para la sección de comentarios
            tags: ['serenidad', 'tranquilidad', 'paz']
        },
        {
            id: 2,
            image: 'prueba2.jpg',
            title: 'Bendecida',
            description: 'Feliz inicio de semana',
            photographer: {
                name: 'Martina Martini',
                profileImage: '3135768.png',
                isVerified: false,
                followers: 0,
                isFollowed: false,
            },
            likes: 0,
            liked: false,
            comments: [],
            ratings: [],
            showCommentSection: false, // Estado inicial para la sección de comentarios
            tags: ['bendecida', 'feliz', 'semana']
        },
    ]);

    // Función para cambiar el estado de showCommentSection
    const toggleCommentSection = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    return { ...post, showCommentSection: !post.showCommentSection };
                }
                return post;
            })
        );
    };

    const handleFollow = (photographerName) => {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.photographer.name === photographerName) {
                    const isFollowed = !post.photographer.isFollowed;
                    const followers = isFollowed ? post.photographer.followers + 1 : post.photographer.followers - 1;

                    if (isFollowed) {
                        alert(`Ahora sigues a ${photographerName}`);
                    } else {
                        alert(`Has dejado de seguir a ${photographerName}`);
                    }

                    return {
                        ...post,
                        photographer: {
                            ...post.photographer,
                            isFollowed: isFollowed,
                            followers: followers,
                        },
                    };
                }
                return post;
            })
        );
    };

    const handleLike = (postId) => {
        setPosts(prevPosts => {
            return prevPosts.map(post => {
                if (post.id === postId) {
                    if (post.liked) {
                        return { ...post, likes: post.likes - 1, liked: false };
                    } else {
                        return { ...post, likes: post.likes + 1, liked: true };
                    }
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
        alert(`Solicitud de verificación enviada para ${photographerName}`);
    };

    const handleReportInappropriateContent = (postId) => {
        navigate(`/reporte/${postId}`);
    };

    const toggleDropdownMenu = (postId) => {
        setPosts(prevPosts =>
            prevPosts.map(post => {
                if (post.id === postId) {
                    return { ...post, showDropdown: !post.showDropdown };
                }
                return post;
            })
        );
    };

    return (
        <div className="feed-container">
            {posts.map(post => (
                <div key={post.id} className="post-card">
                    <div className="post-header">
                        <div className="profile-info">
                            <img src={post.photographer.profileImage} alt={post.photographer.name} className="profile-image" />
                            <div>
                                <h5>{post.photographer.name}</h5>
                                {post.photographer.isVerified && <span className="verified-badge">Verificado</span>}
                            </div>
                        </div>
                        <div className="post-actions">
                            <button
                                onClick={() => handleFollow(post.photographer.name)}
                                className={`follow-btn ${post.photographer.isFollowed ? 'followed' : ''}`}
                            >
                                {post.photographer.isFollowed ? 'Siguiendo' : 'Seguir'}
                            </button>
                            <div className="dropdown">
                                <button
                                    className="dropdown-toggle"
                                    onClick={() => toggleDropdownMenu(post.id)}
                                >
                                    ⋮
                                </button>
                                {post.showDropdown && (
                                    <div className="dropdown-menu show">
                                        <button onClick={() => handleVerificationRequest(post.photographer.name)}>Solicitar Verificación</button>
                                        <button onClick={() => handleReportInappropriateContent(post.id)}>Reportar</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <img src={post.image} alt={post.title} className="post-image" />
                    <div className="post-body">
                        <h5>{post.title}</h5>
                        <p>{post.description}</p>
                    </div>
                    <div className="post-footer">
                        <button
                            onClick={() => handleLike(post.id)}
                            className={`like-btn ${post.liked ? 'liked' : ''}`}
                        >
                            {post.likes} ❤
                        </button>
                        <button onClick={() => toggleCommentSection(post.id)} className="comment-btn">💬</button>
                    </div>
                    {post.showCommentSection && (
                        <CommentSection postId={post.id} comments={post.comments} onComment={handleComment} />
                    )}
                    <Rating postId={post.id} ratings={post.ratings} onRating={handleRating} />
                </div>
            ))}
        </div>
    );
};

const CommentSection = ({ postId, comments, onComment }) => {
    const [comment, setComment] = useState('');

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        onComment(postId, { text: comment, author: 'Usuario', date: new Date().toLocaleString() });
        setComment('');
    };

    return (
        <div className="comment-section">
            {comments.map((comment, index) => (
                <div key={index} className="comment">
                    <strong>{comment.author}</strong> <small>{comment.date}</small>
                    <p>{comment.text}</p>
                </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="comment-form">
                <input 
                    type="text" 
                    placeholder="Agregar un comentario..." 
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                />
                <button type="submit">Comentar</button>
            </form>
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
