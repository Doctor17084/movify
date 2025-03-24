import { useState, useEffect } from "react";
import axios from "axios"; // 🔹 axios - ფილმების მონაცემების სერვერზე გაგზავნისთვის

const AdminPanel = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [genreId, setGenreId] = useState(""); // გთხოვთ აირჩიოთ ჟანრი
  const adminPassword = "admin123"; // 🔹 შეცვალე რეალური პაროლით

  useEffect(() => {
    const savedPassword = localStorage.getItem("adminPassword");
    if (savedPassword === adminPassword) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === adminPassword) {
      localStorage.setItem("adminPassword", password);
      setIsAuthenticated(true);
    } else {
      alert("❌ პაროლი არასწორია!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminPassword");
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !genreId) {
      alert("გთხოვთ შეავსოთ ყველა ველი!");
      return;
    }

    const movieData = {
      title,
      description,
      poster,
      videoUrl,
      backgroundUrl,
      releaseYear,
      genreId,
    };

    try {
      const response = await axios.post("http://localhost/api/addMovie.php", movieData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        alert("ფილმი წარმატებით დაემატა!");
        // შემდგომ შეგიძლიათ გაწმინდოთ ფორმები ან გადამისამართოთ
      } else {
        alert("❌ ფილმის დამატება ვერ მოხერხდა!");
      }
    } catch (error) {
      console.error("Ошибка добавления фильма:", error);
      alert("❌ ფილმის დამატება ვერ მოხერხდა!");
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <h2>🔑 Admin Panel Login</h2>
          <input
            type="password"
            placeholder="შეიყვანე ადმინისტრატორის პაროლი"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>➡️ შესვლა</button>
        </div>
      ) : (
        <div>
          <h2>⚡ Admin Panel</h2>
          <p>✅ ადმინისტრატორი ავტორიზებულია!</p>

          <div>
            <h3>🎬 ფილმების დამატება</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="ფილმის სახელწოდება"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="ფილმის აღწერა"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="პოსტერის URL"
                value={poster}
                onChange={(e) => setPoster(e.target.value)}
              />
              <input
                type="text"
                placeholder="ვიდეო URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
              <input
                type="text"
                placeholder="ფონის URL"
                value={backgroundUrl}
                onChange={(e) => setBackgroundUrl(e.target.value)}
              />
              <input
                type="number"
                placeholder="გამოშვების წელი"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                required
              />
              <select
                value={genreId}
                onChange={(e) => setGenreId(e.target.value)}
                required
              >
                <option value="">აირჩიეთ ჟანრი</option>
                <option value="1">კომედია</option>
                <option value="2">ფანტასტიკა</option>
                <option value="3">დრამა</option>
                <option value="4">კრიმინალური</option>
                <option value="5">საომარი</option>
                <option value="6">დეტექტიური</option>
                <option value="7">სათავგადასავლო</option>
                <option value="8">მძაფრ-სიუჟეტიანი</option>
                <option value="9">ზღაპარი</option>
                <option value="10">სპორტული</option>
                <option value="11">ისტორიული</option>
                <option value="12">ვესტერნი</option>
                <option value="13">საოჯახო</option>
                <option value="14">ბიოგრაფია</option>
                <option value="15">თრილერი</option>
                <option value="16">დოკუმენტური</option>
                <option value="17">მუსიკალური</option>
                <option value="18">მისტიკა</option>
                <option value="19">მელოდრამა</option>
              </select>

              <button type="submit">📥 ფილმის დამატება</button>
            </form>
          </div>

          <button onClick={handleLogout}>🚪 გამოსვლა</button>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
