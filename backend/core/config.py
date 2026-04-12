from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/learning_ai_tracker"
    OPENAI_API_KEY: str  
    UPLOAD_DIR: str = "storage" 
    SECRET_KEY: str = "change-me-in-production-use-openssl-rand-hex-32"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  
    YOUTUBE_COOKIES_PATH: str = ""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")


settings = Settings()
