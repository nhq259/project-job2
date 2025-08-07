import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getListCity } from "../../services/cityService";

function SearchForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await getListCity();
        if (response) {
          const objAll = {
            key: 0,
            value: "All",
          };
          setCity([objAll, ...response]);
          console.log(city);
        }
      } catch (error) {
        console.error("Error fetching city list:", error);
      }
    };

    fetchAPI();
  }, []);

  const handleSubmit = (values) => {
    let city =values.target[0].value || "";

    city = values.target[0].value === "All" ? "" : city;

    navigate(`/search?city=${city}&keyword=${values.target[1].value || ""}`);
   };

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
          1000+ IT Jobs For Developers
        </h1>
        {city && (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", justifyContent: "center", gap: "8px" }}
          >
            {/* City selection */}
            <select
              name="city"
            //   value={city.city}
              // onChange={handleInputChange}
              style={{
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "200px",
              }}
            >
              <option value="">Chọn thành phố</option>
              {city.map((city, index) => (
                <option key={index} value={city.value}>
                  {city.value}
                </option>
              ))}
            </select>

            {/* Keyword input */}
            <input
              type="text"
              name="keyword"
              placeholder="Nhập từ khóa..."
            //   value={city.keyword}
              // onChange={handleInputChange}
              style={{
                padding: "10px",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                width: "300px",
              }}
            />

            {/* Submit button */}
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                fontSize: "1rem",
                borderRadius: "4px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Tìm kiếm
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default SearchForm;
