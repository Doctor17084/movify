import React, { useState } from "react";
import "./auth.css";
import Header from "./Header";
import { registerUser, loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthOverlay = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // ელფოსტის დომენის ვალიდაცია
  const isValidEmailDomain = (email) => {
    const allowedDomains = [
      "gmail.com",
      "mail.ru",
      "inbox.ru",
      "yandex.ru",
      "yahoo.com",
    ];
    const emailDomain = email.split("@")[1];
    return allowedDomains.includes(emailDomain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setUsernameError(false);
    setEmailError(false);

    if (isRegistering) {
      // ვალიდაცია
      if (!username || !email || !password) {
        setError("⚠️ ყველა ველი უნდა იყოს შევსებული.");
        toast.error("⚠️ ყველა ველი უნდა იყოს შევსებული!");
        return;
      }
      if (!isValidEmailDomain(email)) {
        setError("⚠️ დაუშვებელი ელფოსტის დომენი!");
        toast.error("⚠️ დაუშვებელი ელფოსტის დომენი!");
        setEmailError(true);
        return;
      }
      if (password !== confirmPassword) {
        setError("⚠️ პაროლები არ ემთხვევა.");
        toast.error("⚠️ პაროლები არ ემთხვევა!");
        return;
      }

      try {
        const existingUser = await registerUser(username, password, email);

        if (existingUser.usernameExists) {
          setUsernameError(true);
          toast.error("⚠️ მომხმარებლის სახელი უკვე არსებობს.");
          return;
        }

        if (existingUser.emailExists) {
          setEmailError(true);
          toast.error("⚠️ ეს ელ-ფოსტა უკვე რეგისტრირებულია.");
          return;
        }

        toast.success("✅ წარმატებით გაიარეთ რეგისტრაცია!");
        onClose();
      } catch (error) {
        setError("⚠️ შეცდომა! სცადეთ თავიდან.");
        toast.error("⚠️ შეცდომა! სცადეთ თავიდან.");
      }
    } else {
      // ლოგინი
      if (!username && !email) {
        setError("⚠️ შეიყვანეთ ან მომხმარებლის სახელი, ან ელ.ფოსტა.");
        toast.error("⚠️ შეიყვანეთ ან მომხმარებლის სახელი, ან ელ.ფოსტა.");
        return;
      }

      try {
        const response = await loginUser(username, email, password);
        if (response.token) {
          localStorage.setItem("authToken", response.token);
          onClose();
          navigate("/dashboard");
          window.location.reload();
        } else {
          setError("⚠️ შეცდომა!");
          toast.error("⚠️ შეცდომა! სცადეთ თავიდან.");
        }
      } catch (error) {
        setError("⚠️ შეცდომა! სცადეთ თავიდან.");
        toast.error("⚠️ შეცდომა! სცადეთ თავიდან.");
      }
    }
  };

  return (
    <div className="expanded-auth">
      <div className="content-header">
        <Header />
      </div>
      <div className={`auth-box ${error ? "shake" : ""}`}>
        <button className="closes" onClick={onClose}>
          X
        </button>
        <h2>{isRegistering ? "რეგისტრაცია" : "ავტორიზაცია"}</h2>

        {error && <div className="error-message">{error}</div>}

        <form className="auth" onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <input
                type="text"
                placeholder="მომხმარებლის სახელი"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ borderColor: usernameError ? "red" : "" }}
              />
              <input
                type="email"
                placeholder="ელ. ფოსტა"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ borderColor: emailError ? "red" : "" }}
              />
              <input
                type="password"
                placeholder="პაროლი"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="გაიმეორეთ პაროლი"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          {!isRegistering && (
            <>
              <input
                type="text"
                placeholder="მომხმარებლის სახელი"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="პაროლი"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}

          <div className="buttons-user">
            <button type="submit">
              {isRegistering ? "რეგისტრაცია" : "ავტორიზაცია"}
            </button>
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="toggle-button"
            >
              {isRegistering ? "ავტორიზაცია" : "რეგისტრაცია"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
};

export default AuthOverlay;
