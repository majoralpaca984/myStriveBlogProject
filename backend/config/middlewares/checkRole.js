export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const user = req.user; // req.user è stato popolato dal middleware di autenticazione JWT
  
      if (!user || !allowedRoles.includes(user.role)) {
        return res.status(403).json({ message: "Accesso negato. Non hai i permessi necessari." });
      }
  
      next(); // ruolo autorizzato, prosegui
    };
  };
    // Questo middleware controlla se l'utente ha il ruolo corretto per accedere a determinate rotte  