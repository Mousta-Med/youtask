FROM maven:3.9-amazoncorretto-17 AS build
WORKDIR /youtask-general-api
COPY pom.xml .
RUN mvn dependency:go-offline
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:24
WORKDIR /youtask-general-api
COPY --from=build /youtask-general-api/target/youtask-general-api-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
CMD ["java", "-jar", "youtask-general-api-0.0.1-SNAPSHOT.jar"]
