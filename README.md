# PO - short commands for Polymer

This module is a short command wrapper for the main `polymer-cli` commands.

It allows to use short notation like `po b` - `polymer build`, `po doc` - `polymer analyze > analysis.json` etc.

### Usage

```
npm install po-cli
```
The short utility `po` will be available after installation of package.  
You can type commands like this: `po doc` - generate documentation, `po l` - start linter, `po s -o -p 8080` - execute `polymer serve -o -p 8080` etc.

#### Commands
```
doc  - polymer analyze > analysis.json  
s    - polymer serve  
b    - polymer build  
in   - polymer init  
inst - polymer install  
t    - polymer test  
l    - polymer lint  
```

#### Flags 
```
-v  
--verbose  
-h  
--help  
--version  
--desc  
```