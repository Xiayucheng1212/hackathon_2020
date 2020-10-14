from flask import Flask,render_template,redirect,request,url_for,session

app = Flask(__name__)

@app.route('/create/')
def create_page():
    return render_template("createNew.html")

@app.route('/create/',methods=["GET","POST"])
def create():
    if request.method == "POST":
        project_name = request.form['project_name']
        return redirect(url_for('project',project_name = project_name))

@app.route('/project/')
def project():
    project_name = request.args['project_name']
    return render_template("project.html",project_name 
    = project_name)

if __name__ == '__main__':
    app.debug = True
    app.run()