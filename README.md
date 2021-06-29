# DDD Generator

Generated using [dddgen-cli](https://www.npmjs.com/package/@tandem6/dddgen):
```shell
$ npm i -g @tandem6/dddgen
$ dddgen -p com.tandem6.allsport -a team,player,league
```

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i -g @tandem6/dddgen
```
Note: add `--save` if you are using npm < 5.0.0

## Usage

You must run this command in the src upper folder.

```javascript
dddgen --help
Usage: index [options]

Options:
  -V, --version                    output the version number
  -p, --package <package>          package name
  -a, --aggregate <aggregates...>  aggregate name comma separated list
  -h, --help                       display help for command
```

## Example

### Spring Boot Project Download

```shell
# curl -s https://start.spring.io/starter.zip -o coffeeshop.zip \                                                                          15:38:53
-d type=gradle-project \
-d language=java \
-d bootVersion=2.5.2.RELEASE \
-d baseDir=coffeeshop \
-d groupId=com.tandem6 \
-d artifactId=coffeeshop \
-d name=coffeeshop \
-d description=Demo%20project%20for%20Spring%20Boot \
-d packageName=com.tandem6.coffeeshop \
-d packaging=jar \
-d javaVersion=11 \
-d dependencies=web,data-jpa,h2,actuator,lombok,validation
# unzip coffeeshop
```

### Code Generation
```shell
# cd coffeeshop
# dddgen -p com.tandem6.coffeeshop -a product,coupon,payment,order
```

## Why DDDGen?

DDD is very helpful in developing MSA. But studying DDD takes a lot of time and there is no set style. Therefore, it can give a lot of difficulty when many people create a project together. DDDGen automatically creates a package with its know-how to solve these problems to some extent.

* Clean Architecture
* DDD Tactical Pattern
* Base CRUD Operation

## Release Note
* 0.0.6
  * Error sentence change to english
  * required option apply
  * README.md modified
* 0.0.5
  * .npmignore add
* 0.0.4
  * warning fix
  * typo fix
  * Promise reject method add
* 0.0.3
  * Readme.md modified
* 0.0.2
  * Readme.md modified
* 0.0.1
  * cli option add(using commander)
  * git repository add
