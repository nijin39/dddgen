# Gradle Wrapper를 사용할 수 있는 Java 이미지 사용
# FROM --platform=linux/amd64 openjdk:11-jdk as build
FROM openjdk:11-jdk as build

# 프로젝트 파일 복사
COPY . /usr/src/app

# 프로젝트 디렉토리로 이동
WORKDIR /usr/src/app

# Gradle 빌드 실행
RUN ./gradlew clean build --warning-mode all

# 런타임 이미지 생성
FROM openjdk:11-jdk

# 빌드 이미지에서 생성된 JAR 파일을 런타임 이미지에 복사
COPY --from=build /usr/src/app/build/libs/*-SNAPSHOT.jar app.jar

# 포트 8080 열기
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "/app.jar"]
