# DDD Generator

Generated using [dddgen-cli](https://www.npmjs.com/package/@tandem6/dddgen):
```shell
$ npm i -g @tandem6/dddgen
$ dddgen [aggregate-name]
```

## Installation

Using npm:
```shell
$ npm i -g npm
$ npm i -g @tandem6/dddgen
```
Note: add `--save` if you are using npm < 5.0.0

## Usage

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

```shell
dddgen -p com.tandem6.allsport -a team,player,league
```

## Why DDDGen?

DDD is very helpful in developing MSA. But studying DDD takes a lot of time and there is no set style. Therefore, it can give a lot of difficulty when many people create a project together. DDDGen automatically creates a package with its know-how to solve these problems to some extent.

* Clean Architecture
* DDD Tactical Pattern
* Base CRUD Operation

## Release Note

* 0.0.1.beta
  * cli option add(using commander)
  * git repository add