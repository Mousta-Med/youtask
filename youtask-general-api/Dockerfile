FROM maven:3.9-amazoncorretto-20 AS build
WORKDIR /youtask-general-api
COPY pom.xml .
COPY . .
RUN mvn clean package -DskipTests

FROM amazoncorretto:20
WORKDIR /youtask-general-api
COPY --from=build /youtask-general-api/target/youtask-general-api-0.0.1-SNAPSHOT.jar .
EXPOSE 8080
CMD ["java", "-jar", "youtask-general-api-0.0.1-SNAPSHOT.jar"]
